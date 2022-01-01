import React from 'react';
import { Badge, majorScale } from 'evergreen-ui';

interface Props {
  tags: string[];
}

const EntryTags = ({ tags }: Props) => (
  <>
    {tags.map((tag) => (
      <Badge key={tag} color="automatic" marginRight={majorScale(1)}>
        {tag}
      </Badge>
    ))}
  </>
);

export default EntryTags;
