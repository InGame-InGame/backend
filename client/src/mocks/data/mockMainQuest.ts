export const mockMainQuests = [
  {
    id: 1,
    title: '무인도에서 한달 살아남기',
    difficulty: 0,
    sideQuests: Array(3).fill({ id: 1, content: 'Side Content', status: 'COMPLETED', createdAt: '2022-01-01', updatedAt: '2022-01-01'}),
    startDate: '2022-01-01',
    endDate: '2022-01-31',
    hidden: 'FALSE',
    status: 'ON_PROGRESS',
    createdAt: '2022-01-01',
    updatedAt: '2022-01-01',
  },
  {
    id: 2,
    title: '수영해서 제주도 가기',
    difficulty: 1,
    sideQuests: Array(4).fill({ id:2, content: 'Side Content', status: 'ON_PROGRESS', createdAt: '2022-02-01', updatedAt: '2022-02-01'}),
    startDate: '2022-02-01',
    endDate: '2022-02-28',
    hidden: 'FALSE',
    status: 'ON_PROGRESS',
    createdAt: '2022-02-01',
    updatedAt: '2022-02-01',
  },
  {
    id: 3,
    title: '사막에서 물 구하기',
    difficulty: 2,
    sideQuests: Array(5).fill({ id: 3, content: 'Side Content', status: 'ON_PROGRESS', createdAt: '2022-03-01', updatedAt: '2022-03-01'}),
    startDate: '2022-03-01',
    endDate: '2022-03-31',
    hidden: 'FALSE',
    status: 'ON_PROGRESS',
    createdAt: '2022-03-01',
    updatedAt: '2022-03-01',
  },
  {
    id: 4,
    title: '고래뱃속 들어가보기',
    difficulty: 0,
    sideQuests: Array(3).fill({ id: 4, content: 'Side Content', status: 'ON_PROGRESS', createdAt: '2022-04-01', updatedAt: '2022-04-01'}),
    startDate: '2022-04-01',
    endDate: '2022-04-30',
    hidden: 'FALSE',
    status: 'ON_PROGRESS',
    createdAt: '2022-04-01',
    updatedAt: '2022-04-01',
  },
  {
    id: 5,
    title: '우주로 떠나기',
    difficulty: 1,
    sideQuests: Array(4).fill({ id: 5, content: 'Side Content', status: 'ON_PROGRESS', createdAt: '2022-05-01', updatedAt: '2022-05-01'}),
    startDate: '2022-05-01',
    endDate: '2022-05-31',
    hidden: 'FALSE',
    status: 'ON_PROGRESS',
    createdAt: '2022-05-01',
    updatedAt: '2022-05-01',
  },
];