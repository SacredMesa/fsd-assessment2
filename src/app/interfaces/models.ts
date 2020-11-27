export interface Api {
  id?: number
  api: string
}

export interface Country {
  id?: number
  name: string
  alpha2code: string
  flag: string
}

export interface News {
  source: string
  author: string
  title: string
  description: string
  url: string
  image: string
  published: string
  content: string
}