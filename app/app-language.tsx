import BasicScreen from "@/components/basic-screen";
import Button from "@/components/button";
import { Choices } from "@/components/choices";
import { ROUTE } from "@/constants/route";
import { changeLanguage } from "@/utilities/i18n";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function AppLanguage() {
  const languages = [
    {
      text: "Français",
    },
    {
      text: "Anglais",
    },
  ];

  const languageCodeMap = {
    Français: "fr",
    Anglais: "en",
  };

  const [selectedLanguage, setSelectedLanguage] = useState<string>();

  const saveChange = () => {
    changeLanguage(
      languageCodeMap[selectedLanguage as keyof typeof languageCodeMap],
    );
    router.replace(ROUTE.ROOT);
  };

  return (
    <BasicScreen
      title="Langue de l’application"
      description="Change la à tout moment selon tes préférences."
    >
      <View className="px-4 mt-6 flex-1 pb-safe gap-6">
        <Choices
          label="Quelle langue veux-tu utiliser ?"
          data={languages}
          type="radio"
          selectedChoice={selectedLanguage}
          onChange={(choice) => {
            setSelectedLanguage(choice);
          }}
          inactiveItemClassName="border-white"
        />

        <View className="grow" />

        <Button
          text="Enregistrer les modifications"
          size="large"
          disabled={!selectedLanguage}
          className="mb-6"
          onPress={saveChange}
        />
      </View>
    </BasicScreen>
  );
}
