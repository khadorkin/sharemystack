import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";
import { Button, Text, XStack } from "tamagui";
import { CategoryIcon } from "../categories/CategoryIcon";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

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
  let { stackType: slug } = useGlobalSearchParams<{ stackType: string }>();

  return (
    <XStack borderBottomColor="$borderColor" borderBottomWidth="$1">
      {stacks.map((stack) => {
        return (
          <Button
            key={stack.stackTypeSlug}
            onPress={() => {
              router.push(`/@${profile?.slug}/${stack.stackTypeSlug}`);
            }}
            unstyled
            // backgroundColor={slug === stack.stackTypeSlug ? "red" : "blue"}
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
