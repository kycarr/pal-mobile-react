import * as React from 'react';
import { Component, Styles, View, Text, ScrollView } from 'reactxp';

import { Topic } from '../models/Topic';

interface TopicListState {
    topics: Topic[];
}

const styles = {
    scroll: Styles.createScrollViewStyle({
        alignSelf: 'stretch',
    }),
    container: Styles.createViewStyle({
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }),
};

export class TopicListPanel extends Component<void, TopicListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            topics: []
        };
    }

    public async componentWillMount() {
        var req = await fetch(`http://localhost:3001/api/topics`);
        var json = await req.json();
        var topics = [];
        for (var i in json) {
            let topic: Topic = json[i] as Topic;
            topics.push(topic);
        }

        this.setState({
            topics: topics,
        });
    }

    render() {
        return (
            <View useSafeInsets={true}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        {this.displayTopics(this.state.topics)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    private displayTopics = (topics: Topic[]) => {
        return topics.map((topic: Topic) => (
            <View key={topic.id}>
                {topic.name}
            </View>
        ))
    }
}
