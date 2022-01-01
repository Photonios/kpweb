import React, { ChangeEvent } from 'react';
import { SearchInput } from 'evergreen-ui';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const StretchedSearchInput = ({ value, onChange }: Props) => (
  <SearchInput
    placeholder="Type to filter..."
    value={value}
    onChange={(e: ChangeEvent<HTMLInputElement>) => {
      e.persist();
      onChange(e.target.value);
    }}
    width="100%"
  />
);

export default StretchedSearchInput;
