import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userPhone: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});

export default styles;
