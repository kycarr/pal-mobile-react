import * as React from 'react';
import { Component, Styles, View, Text, ScrollView } from 'reactxp';

import { Topic } from '../models/Topic';
import { KnowledgeComponent } from '../models/KnowledgeComponent';

interface TopicListState {
    topics: Topic[];
}

const styles = {
    scroll: Styles.createScrollViewStyle({
        height: 500,
    }),
    container: Styles.createViewStyle({
        padding: 16,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    }),
    header: Styles.createTextStyle({
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }),
    topic: Styles.createViewStyle({
        flexWrap: "wrap",
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        padding: 16,
    }),
    columnHeader: Styles.createViewStyle({
        flexDirection: 'column',
        flexGrow: 0,
        marginRight: 50,
    }),
    column: Styles.createViewStyle({
        flexDirection: 'column',
        flexGrow: 1,
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
                <View style={styles.container}>
                    <Text style={styles.header}>
                        Topics
                    </Text>
                    <ScrollView style={styles.scroll}>
                        {this.displayTopics(this.state.topics)}
                    </ScrollView>
                </View>
            </View>
        );
    }

    private displayTopics = (topics: Topic[]) => {
        return topics.map((topic: Topic) => (
            this.displayTopic(topic)
        ))
    }

    private displayTopic = (topic: Topic) => {
        return (
            <View style={styles.topic} key={topic.id}>
                <View style={styles.columnHeader}>
                    <Text>name:</Text>
                    <Text>id:</Text>
                    <Text>alias:</Text>
                    <Text>createdAt:</Text>
                    <Text>updatedAt:</Text>
                    <Text>prerequisiteTopics:</Text>
                    <Text>knowledgeComponents:</Text>
                </View>
                <View style={styles.column}>
                    <Text>{topic.name}</Text>
                    <Text>{topic.id}</Text>
                    <Text>{topic.alias}</Text>
                    <Text>{topic.createdAt}</Text>
                    <Text>{topic.updatedAt}</Text>
                    <ScrollView horizontal={true}>
                        {topic.prerequisiteTopics.map((prereq: string) => (
                            `${prereq}, `
                        ))}
                    </ScrollView>
                    {topic.knowledgeComponents.map((kc: KnowledgeComponent) => (
                        <Text>
                            {`${kc.kc} ( relevance=${kc.relevance} )`}
                        </Text>
                    ))}
                </View>
            </View>
        )
    }
}
