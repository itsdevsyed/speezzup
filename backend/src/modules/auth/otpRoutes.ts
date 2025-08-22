import { FastifyInstance } from "fastify";
import { generateOtp } from "../../utils/otp";
import { saveOtp, verify, OTP_TTl } from "../../utils/otpStore";
import { otpQueue } from "./otpQueue";
import { canRequestOtp } from '../../utils/rateLimiter';
import {incrementMetric} from './../../utils/metrics'
import { PrismaClient } from "./../../../generated/prisma";

const prisma = new PrismaClient();

export const otpRoutes = async (fastify: FastifyInstance) => {

    fastify.post('/otp/send', async (request, reply) => {
        const { phone } = request.body as { phone: string };

        if (!(await canRequestOtp(phone))) {
            fastify.log.warn(`Rate limit exceeded for phone: ${phone}`);
            return { success: false, message: 'Too many requests. Try again later.' };
        }
        const otp = generateOtp();
        await saveOtp(phone, otp);
        await otpQueue.add('otp', { phone, otp });
        await incrementMetric('otp_sent');
        fastify.log.info(`OTP generated for phone: ${phone} → ${otp}`); // log OTP generation

        reply.success(null, "OTP sent successfully", { ttl: OTP_TTl });
    });

    fastify.post('/otp/verify', async (request, reply) => {
        const { phone, otp } = request.body as { phone: string, otp: string };
        if (!phone || !otp) {
            await incrementMetric('otp_failed');
            fastify.log.warn(`OTP verification failed: missing phone or otp`);
            reply.fail("OTP_INVALID", "The OTP is invalid or expired.");
        }

        const isValid = await verify(phone, otp);
        if (!isValid) {
            await incrementMetric('otp_verified');
            fastify.log.warn(`OTP verification failed for phone: ${phone}`);
            return reply.status(400).send({ success: false, message: 'Invalid OTP' });
        }

        await prisma.user.create({
            data: {
              phone: phone,
              email: `${phone}@speezyup.local` // auto-generate
            }
          });



        const token = fastify.jwt.sign({ phone });

        fastify.log.info(`OTP verified successfully for phone: ${phone}`); // log success

        reply.success({ token, expires_in: 900 }, "OTP verified successfully");
    });
};
