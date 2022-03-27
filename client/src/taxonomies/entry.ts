export interface EntryDataDTO {
  name: string;
  username: string;
  url: string;
  notes: string;
  path: string[];
  tags: string[];
}

export interface EntryDTO extends EntryDataDTO {
  id: string;
  data: EntryDataDTO;
}
