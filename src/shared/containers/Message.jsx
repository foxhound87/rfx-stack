import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Components
import Helmet from 'react-helmet';
import PostDetailsHeader from '@/shared/components/PostDetailsHeader';
import PostDetails from '@/shared/components/PostDetails';
import { authorize } from '@/utils/authorize.hoc';

@inject('store') @authorize @observer
export default class Message extends Component {
  static postForm;

  static fetchData({ store, params }) {
    console.log('Fetching message data for', params.messageId); // eslint-disable-line
    return store.post.get(params.messageId);
  }

  static propTypes = {
    store: React.PropTypes.object,
  };

  componentWillUnmount() {
    return this.props.store.post.clear();
  }

  render() {
    const { post } = this.props.store;

    return (
      <div className="pt5 ph4">
        <Helmet title="Message Details" />
        <PostDetailsHeader post={post.selected} />
        <div className="pv4 _c4">
          <PostDetails item={post.selected} />
        </div>
      </div>
    );
  }
}
