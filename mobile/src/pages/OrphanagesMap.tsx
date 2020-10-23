import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface OrphanageItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);

    useFocusEffect(() => {
      api.get('orphanages').then(res => {
         setOrphanages(res.data);
      });
    });

    const navigation = useNavigation();

    function handleNavigateToOrphanageDetail(id: number) {
      navigation.navigate('OrphanageDetails', { id });
    }

    function handleNavigateToCreateOrphanage() {
      navigation.navigate('SelectMapPosition');
    }

    return(
        <View style={styles.container}>
        <MapView  
          provider={PROVIDER_GOOGLE}
          style={styles.map} 
          initialRegion={{ 
            latitude: -43.5309368,
            longitude: 172.636626,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
           }} 
        >
          { orphanages.map(orphanage => {
            return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{ 
                x: 2.3,
                y: 0.68,
              }}
              coordinate={{ 
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetail(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
            )
          })}
        </MapView>
  
        <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} Orphanages found</Text>
              <RectButton style={styles.cretaOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
                <Feather name="plus" size={20} color="#FFF" />
              </RectButton>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
    calloutText: {
      color: '#0089a5',
      fontFamily: 'Nunito_700Bold',
      fontSize: 14
    },
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 10,
    },
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
    cretaOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  