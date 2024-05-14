import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from '.';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          
        }}
      />
    </Tabs>
  );
}
