import React from 'react';
import { Badge, majorScale } from 'evergreen-ui';
import { Theme, useTheme } from 'evergreen-ui';

interface Props {
  tags: string[];
}

const createHashCode = (value: string): number => {
  let hashCode = 0;

  for (let i = 0; i < value.length; i++) {
    hashCode = value.charCodeAt(i) + ((hashCode << 5) - hashCode);
  }

  return hashCode;
};

const pickColor = (theme: Theme, value: string): string => {
  const hashCode = createHashCode(value);
  // @ts-ignore
  const availableColors = Object.keys(theme.fills);

  return availableColors[hashCode % availableColors.length];
};

const EntryTags = ({ tags }: Props) => {
  const theme = useTheme();

  return (
    <>
      {tags.map((tag) => (
        <Badge
          key={tag}
          // @ts-ignore
          color={pickColor(theme, tag)}
          marginRight={majorScale(1)}
        >
          {tag}
        </Badge>
      ))}
    </>
  );
};

export default EntryTags;
