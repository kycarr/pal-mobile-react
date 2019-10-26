import * as React from 'react';
import { CommonProps, Component, Styles, View, Text, ScrollView } from 'reactxp';
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';
import { VirtualListCellRenderDetails } from 'reactxp-virtuallistview/dist/VirtualListCell';

import { Topic } from '../models/Topic';

interface TopicListPanelProps extends CommonProps {
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
    helloWorld: Styles.createTextStyle({
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 28
    }),
};

export class TopicListPanel extends Component {
    public state = {
        topics: ["test"],
    };

    constructor(props: TopicListPanelProps) {
        super(props);
    }

    public async componentWillMount() {
        // const req = await fetch(`https://jsonplaceholder.typicode.com/users`);

        // const data = await req.json();

        // this.setState({
        //     users: data,
        // });
    }

    render() {
        return (
            <View useSafeInsets={true}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Text style={styles.helloWorld}>
                            test
                        </Text>
                        {this.displayTopics(this.state.topics)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    private displayTopics = (topics: string[]) => {
        return topics.map((topic: string) => (
            <View key={topic}>
                {topic}
            </View>
        ))
    }
}
