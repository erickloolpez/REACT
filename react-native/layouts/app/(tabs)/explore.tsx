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
      <Collapsible title="fade-images">
        <ThemedText>
          This app use a flat list with a cool animation using react-native-reanimated:{' '}
        </ThemedText>
        <Link href={'/fade-list'} style={{ marginTop: 8 }}>
          <Image source={require('../../assets/images/rotate-slide.png')} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
        </Link>
      </Collapsible>
      <Collapsible title="counter">
        <ThemedText>
          This app use a counter but it appears in a particular way:{' '}
        </ThemedText>
        <Link href={'/counter'} style={{ marginTop: 8 }}>
          <Image source={require('../../assets/images/counter.png')} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
        </Link>
      </Collapsible>
      <Collapsible title="ranking">
        <ThemedText>
          This app use an animated rank for the positions:{' '}
        </ThemedText>
        <Link href={'/masonry'} style={{ marginTop: 8 }}>
          <Image source={require('../../assets/images/masonry.png')} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
        </Link>
      </Collapsible>
      <Collapsible title="navbar">
        <ThemedText>
          This app use an animated navbar:{' '}
        </ThemedText>
        <Link href={'/nav'} style={{ marginTop: 8 }}>
          <Image source={require('../../assets/images/masonry.png')} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
        </Link>
      </Collapsible>
      <Collapsible title="bottom modal">
        <ThemedText>
          This app use an animated bottom modal:{' '} In the ROOT you need to add the BottomSheetModalProvider and in the component you need to add the BottomSheetModal and BottomSheetView
        </ThemedText>
        <Link href={'/modalBottom'} style={{ marginTop: 8 }}>
          <Image source={require('../../assets/images/masonry.png')} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
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
