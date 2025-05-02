import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Layouts</ThemedText>
      </ThemedView>
      <ThemedText>This app includes examples code to help you to only copy and paste.</ThemedText>
      <Collapsible title="ai-playground">
        <ThemedText>
          This app has two consists in something beautiful to present to the user:{' '}
        </ThemedText>
        <Link href={'/ai-playground'} style={{ marginTop: 8 }}>
          <Image source={require('../../assets/images/ai-playground.png')} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
        </Link>
      </Collapsible>
    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
