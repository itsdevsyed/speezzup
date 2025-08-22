// PaperFix.tsx
import * as Paper from 'react-native-paper';
import React from 'react';

// Cast all components to `any` to fix TS ForwardRef issues
export const Button: any = Paper.Button;
export const Card: any = Paper.Card;
export const Text: any = Paper.Text;
export const Appbar: any = Paper.Appbar;
export const Avatar: any = Paper.Avatar;
export const Divider: any = Paper.Divider;
export const IconButton: any = Paper.IconButton;
