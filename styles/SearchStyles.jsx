import { StyleSheet } from "react-native"; 
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
      },
      searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 12,
      },
      trendingContainer: {
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      tagWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
      },
      tag: {
        backgroundColor: '#eee',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
      },
      tagText: {
        color: '#444',
        fontWeight: '500',
      },
      resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
      },
      resultImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
      },
      itemName: {
        fontSize: 16,
        fontWeight: '600',
      },
      itemPrice: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
      },
      emptyText: {
        marginTop: 24,
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
      },
});
export default styles;