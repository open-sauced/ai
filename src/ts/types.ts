interface IUserPR {
  readonly title: string;
  readonly author_login: string;
  readonly state: string;
  readonly created_at: string;
  readonly closed_at: string;
  readonly merged_at: string;
  readonly updated_at: string;
  readonly filesCount: number;
  linesCount: number;
  readonly merged: boolean;
  readonly draft: boolean;
  readonly full_name: string;
  readonly number: number;
  readonly additions: number;
  readonly deletions: number;
  readonly changed_files: number;
  readonly repo_id: number;
}
