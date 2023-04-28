export type BulkAction =
  | {
      // 何もしない
      kind: 'none'
    }
  | {
      // クラス名を変更する
      kind: 'rename'
      // 変更後のクラス名
      name: string
    }
  | {
      // クラスを他のクラスに統合する
      kind: 'integrate'
      // 統合先の組のID
      id: string
    }
