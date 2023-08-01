import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Button, Text, XStack } from "tamagui";

import { CategoryIcon } from "../categories/CategoryIcon";

import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";

export function StacksTabBar({
  tabBarProps,
  profile,
  stacks,
}: {
  tabBarProps: MaterialTopTabBarProps;
  profile: Profile;
  stacks: Stack[];
}) {
  const router = useRouter();
  let { stack: stackId } = useGlobalSearchParams<{ stack: string }>();
  stackId ??= profile.primaryStackId;

  return (
    <XStack borderBottomColor="$borderColor" borderBottomWidth="$1">
      {stacks.map((stack) => {
        return (
          <Button
            key={stack.stackTypeSlug}
            onPress={() => {
              router.push(`/@${profile?.slug}/${stack.id}`);
            }}
            unstyled
            backgroundColor={stackId === stack.id ? "$gray5" : "transparent"}
          >
            <XStack padding="$3" alignItems="center">
              <CategoryIcon name={stack.stackTypeIconName} />
              <Text marginLeft="$3">{stack.stackTypeName}</Text>
            </XStack>
          </Button>
        );
      })}
    </XStack>
  );
}
