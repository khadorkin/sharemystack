import { Button, Input, Text, XStack, YStack } from "tamagui";
import { useRef, useState } from "react";

import { supabase } from "../../lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import { isValidSlug } from "@/lib/validation";
import { TextInput } from "react-native";

export function CreateStack({ refresh }: { refresh: () => void }) {
  const { user } = useAuth();
  const [name, setName] = useState<string | null | undefined>(
    user?.user_metadata.full_name
  );
  const [slug, setSlug] = useState<string | null | undefined>(
    user?.user_metadata.preferred_username
  );
  const [validate, setValidate] = useState(false);
  const nameRef = useRef<TextInput>(null);
  const slugRef = useRef<TextInput>(null);

  /* useEffect(() => {
    if (user) {
      !name && setName(user.user_metadata.full_name);
      !slug && setSlug(user.user_metadata.preferred_username);
    }
  }, [user]); */

  async function createStack() {
    nameRef.current?.blur();
    slugRef.current?.blur();
    setValidate(true);
    if (user && name && slug) {
      console.log({ name, slug });
      const { data, error } = await supabase.from("stacks").insert({
        name,
        slug,
        twitter: user.user_metadata.preferred_username,
        twitter_image_url: user.user_metadata.avatar_url,
        user_id: user.id,
      });
      refresh();
      // console.log({ data, error });
      // console.log("createStack", data, error);
    }
  }

  return (
    <YStack padding="$3">
      <Text marginBottom="$3" textAlign="center">
        You have not yet created your stack. Let's do that now.
      </Text>
      <YStack>
        <XStack alignItems="center">
          <Input
            value={name ?? ""}
            onChangeText={(text) => setName(text)}
            borderBottomStartRadius={0}
            borderBottomEndRadius={0}
            flexGrow={1}
            placeholder="Name"
            borderColor={validate && !name ? "$red10" : undefined}
            borderBottomColor={
              validate && (!name || !isValidSlug(slug)) ? "$red10" : undefined
            }
            ref={nameRef}
            onFocus={() => setValidate(false)}
          />
        </XStack>
        <XStack alignItems="center">
          <Input
            value="@"
            borderTopWidth={0}
            borderTopStartRadius={0}
            borderTopEndRadius={0}
            borderRightWidth={0}
            borderBottomEndRadius={0}
            editable={false}
            paddingRight={0}
            borderColor={validate && !isValidSlug(slug) ? "$red10" : undefined}
          />
          <Input
            value={slug ?? ""}
            onChangeText={(text) =>
              (!text || isValidSlug(text, true)) && setSlug(text.toLowerCase())
            }
            borderLeftWidth={0}
            borderTopWidth={0}
            borderTopStartRadius={0}
            borderTopEndRadius={0}
            borderBottomStartRadius={0}
            paddingLeft={0}
            flexGrow={1}
            placeholder="handle"
            borderColor={validate && !isValidSlug(slug) ? "$red10" : undefined}
            onFocus={() => setValidate(false)}
            ref={slugRef}
          />
        </XStack>
      </YStack>
      <Button onPress={createStack} marginTop="$3">
        Create my stack
      </Button>
    </YStack>
  );
}
