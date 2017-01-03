import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { selectHisotryTag } from '../duck/historyTagWidget';
import Tag from '../component/Tag';

const HistoryTag = ({ historyTag, onTagClick }) => (<div className="c-historyTags">
  {
    historyTag.map(tag => (<Tag
      label={tag}
      onClick={() => onTagClick(tag)}
    />))
  }
</div>);

const mapStateToProps = state => ({
  historyTag: state.historyTag
});

const mapDispatchToProps = ({
  onTagClick: selectHisotryTag
});

HistoryTag.propTypes = {
  historyTag: ImmutablePropTypes.isRequired,
  onTagClick: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTag);
