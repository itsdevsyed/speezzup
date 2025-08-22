import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Text,
  IconButton,
  Divider,
  Avatar,
} from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header elevated>
        <Appbar.Action icon="menu" onPress={() => console.log('Menu pressed')} />
        <Appbar.Content title="Speezy" subtitle="Your Dashboard" />
        <Appbar.Action icon="magnify" onPress={() => console.log('Search pressed')} />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log('More pressed')} />
      </Appbar.Header>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="headlineMedium" style={styles.welcomeText}>
          Welcome Back!
        </Text>
        <Text variant="bodyMedium" style={styles.subText}>
          Here’s a quick overview of your activity
        </Text>

        {/* Cards Section */}
        <Card style={styles.card} elevation={3}>
          <Card.Title
            title="Daily Summary"
            subtitle="Your stats for today"
            left={(props) => <Avatar.Icon {...props} icon="chart-line" />}
          />
          <Card.Content>
            <Text>Steps: 12,345</Text>
            <Text>Calories: 1,234 kcal</Text>
            <Text>Workouts: 3</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => console.log('View Details')}>View Details</Button>
          </Card.Actions>
        </Card>

        <Divider style={{ marginVertical: 16 }} />

        {/* Quick Actions */}
        <Text variant="titleMedium" style={{ marginBottom: 8 }}>
          Quick Actions
        </Text>
        <View style={styles.buttonRow}>
          <Button
            icon="plus"
            mode="contained"
            onPress={() => console.log('Add new')}
            style={styles.actionButton}
          >
            Add
          </Button>
          <Button
            icon="pencil"
            mode="outlined"
            onPress={() => console.log('Edit')}
            style={styles.actionButton}
          >
            Edit
          </Button>
          <Button
            icon="delete"
            mode="outlined"
            onPress={() => console.log('Delete')}
            style={styles.actionButton}
          >
            Delete
          </Button>
        </View>

        {/* Another Card */}
        <Card style={styles.card} elevation={3} >
        <Card.Title
            title="Notifications"
            subtitle="You have 3 new messages"
            left={(props) => <Avatar.Icon {...props} icon="bell" />}
          />
          <Card.Content>
            <Text>- Message from John</Text>
            <Text>- Weekly report is ready</Text>
            <Text>- New feature released!</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => console.log('View All')}>View All</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeText: {
    marginBottom: 4,
  },
  subText: {
    marginBottom: 16,
    color: 'gray',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});
