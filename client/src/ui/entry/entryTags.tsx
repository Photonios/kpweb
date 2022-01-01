import React from 'react';
import { Badge, majorScale } from 'evergreen-ui';

interface Props {
  tags: string[];
}

const colors = ['green', 'blue', 'red', 'orange', 'purple', 'yellow'];

const pickBadgeColor = (tag: string): string => {
  const tagHash = [...tag].reduce(
    (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
    0
  );
  return colors[tagHash % colors.length];
};

const EntryTags = ({ tags }: Props) => (
  <>
    {tags.map((tag) => (
      <Badge key={tag} color={pickBadgeColor(tag)} marginRight={majorScale(1)}>
        {tag}
      </Badge>
    ))}
  </>
);

export default EntryTags;
