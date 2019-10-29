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
        var data = json.data;

        var topics = [];
        for (var i in data) {
            let topic: Topic = data[i] as Topic;
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
                    {this.displayPrereqsHeader(topic)}
                    {this.displayKCsHeader(topic)}
                </View>
                <View style={styles.column}>
                    <Text>{topic.name}</Text>
                    <Text>{topic.id}</Text>
                    <Text>{topic.alias}</Text>
                    <Text>{topic.createdAt}</Text>
                    <Text>{topic.updatedAt}</Text>
                    {this.displayPrereqs(topic)}
                    {this.displayKCs(topic)}
                </View>
            </View>
        )
    }

    private displayPrereqsHeader = (topic: Topic) => {
        const items = []
        for (const [index, value] of topic.prerequisiteTopics.entries()) {
            if (index != 0) {
                items.push(<Text> </Text>)
            }
        }
        return (
            <View>
                <Text>prerequisiteTopics:</Text>
                {items}
            </View>
        )
    }

    private displayPrereqs = (topic: Topic) => {
        if (topic.prerequisiteTopics.length == 0) {
            return <Text>n/a</Text>
        }
        return (
            topic.prerequisiteTopics.map((prereq: string) => (
                <Text>{prereq}</Text>
            ))
        )
    }

    private displayKCsHeader = (topic: Topic) => {
        const items = []
        for (const [index, value] of topic.knowledgeComponents.entries()) {
            if (index != 0) {
                items.push(<Text> </Text>)
            }
        }
        return (
            <View>
                <Text>knowledgeComponents:</Text>
                {items}
            </View>
        )
    }

    private displayKCs = (topic: Topic) => {
        if (topic.knowledgeComponents.length == 0) {
            return <Text>n/a</Text>
        }
        return (
            topic.knowledgeComponents.map((kc: KnowledgeComponent) => (
                <Text>
                    {`${kc.kc}, relevance=${kc.relevance}`}
                </Text>
            ))
        )
    }
}
