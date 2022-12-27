import * as React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import DownloadList from '../components/DownloadList';
import LibraryList from '../components/LibraryList';
import StyleVariables from '../styles/StyleVariables';


export default function Library(props) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'LibraryList', title: 'Library'},
    {key: 'DownloadList', title: 'Download'},
  ]);

  const renderScene = SceneMap({
    LibraryList:() => <LibraryList {...props} />,
    DownloadList:() => <DownloadList {...props} />,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={{ backgroundColor: StyleVariables.AppColor }}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
}
