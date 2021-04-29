import React from 'react';
import { StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import { Accordion, Body, Card, CardItem, Icon, Right, Left } from 'native-base';
import { WebView } from 'react-native-webview';

const activityIndicatorElement = () => {
    return (
        <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator
                color='#007bff'
                size='large'
            />
        </View>
    );
};

const renderHeader = (title, expanded) => {
    const [lesson, lessonNumber, ...rest ] = title.split(' ');

    return (
        <Card style={styles.card}>
            <CardItem style={styles.card}>
                <Left style={{flex: 0.28}}>
                    <Text style={{fontWeight: 'bold', marginRight: 5}}>{lesson}</Text>
                    <Text style={{fontWeight: 'bold'}}>{lessonNumber}</Text>
                </Left>
                <Body style={styles.cardItemBody}>
                    <Text>{rest.join(' ')}</Text>
                </Body>
                <Right style={styles.cardItemRight}>
                    <Icon style={{ fontSize: 18 }} name={ expanded ? 'arrow-up' : 'arrow-down'} />
                </Right>
            </CardItem>
        </Card>
    );
}

const renderContent = (youtubeUrl) => {
    return (
        <Card>
            <CardItem style={{height: 200}}>
                <WebView
                    bounces={false}
                    startInLoadingState={true}
                    renderLoading={activityIndicatorElement}
                    source={{uri: `${youtubeUrl.replace('watch?v=', 'embed/')}`}}
                    style={{marginBottom: 10}}
                    showsHorizontalScrollIndicator={false}
                    scalesPageToFit
                    allowsFullscreenVideo={true}
                />
            </CardItem>
        </Card>
    );
}

const VideoLessons = ({ videoLessons }) => {
    return (
        <Accordion
            dataArray={videoLessons}
            renderHeader={({title}, expanded) => renderHeader(title, expanded) }
            renderContent={({youtubeUrl}) => renderContent(youtubeUrl)}
            expanded={[]}
        />
    );
}

export default VideoLessons;

const styles = StyleSheet.create({
    card: {
        borderColor: '#007bff',
        borderWidth: 1
    },
    cardItemBody: {
        flex: 0.95,
        fontWeight: 'bold',
        flexDirection: 'row'
    },
    cardItemRight: {
        flex: 0.05
    },
    activityIndicatorStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    activityContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
