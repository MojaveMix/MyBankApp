import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Icon } from 'lucide-react-native';
import {
  ArrowRightLeft,
  Receipt,
  PlusCircle,
  Scan
} from 'lucide-react-native';

interface QuickActionProps {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const iconMap: { [key: string]: any } = {
  'arrow-right-left': ArrowRightLeft,
  'receipt': Receipt,
  'plus-circle': PlusCircle,
  'scan': Scan,
};

export default function QuickAction({ title, icon, color, onPress }: QuickActionProps) {
  const IconComponent = iconMap[icon] || ArrowRightLeft;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <IconComponent size={24} color={color} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
});
