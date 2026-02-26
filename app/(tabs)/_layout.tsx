import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { ColorConst } from "@/constants/theme";
import { ROUTE_NAME } from "@/constants/route";
import { useTranslation } from "react-i18next";
import IcHome from "@/components/icons/home";
import IcProfile from "@/components/icons/profile";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: ColorConst.secondary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingTop: Platform.select({
              android: 4,
              ios: 12,
            }),
            backgroundColor: ColorConst.light,
          },
          sceneStyle: {
            backgroundColor: ColorConst.light,
          },
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: t("menu.home"),
          tabBarIcon: ({ color }) => <IcHome size={28} color={color} />,
          sceneStyle: {
            backgroundColor: 'white',
          },
        }}
      />
      <Tabs.Screen
        name={ROUTE_NAME.PROFILE}
        options={{
          title: t("menu.profile"),
          tabBarIcon: ({ color }) => <IcProfile size={28} color={color} />,
        }}
      />
    </Tabs>
    </>
  );
}
