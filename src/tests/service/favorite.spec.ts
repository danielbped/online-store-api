import { ICreateFavoriteDTO } from "../../entity/Favorite";
import FavoriteService from "../../service/Favorite";
import ErrorMessage from "../../utils/ErrorMessage";

describe('Expect that FavoriteService can', () => {
  let favoriteService: FavoriteService;

  beforeEach(() => {
    favoriteService = new FavoriteService();
    jest.clearAllMocks();
  });

  const createdAt = new Date();
  const updatedAt = new Date();

  const MOCKED_USER = {
    "id": "MOCKED_USER_1_ID",
    "firstName": "MOCKED_USER_1_FIRST_NAME",
    "lastName": "MOCKED_USER_1_LAST_NAME",
    "email": "MOCKED_USER_1_EMAIL",
    createdAt,
    updatedAt,
    "password": "<PASSWORD>"
  };

  const MOCKED_USER_2 = {
    "id": "MOCKED_USER_2_ID",
    "firstName": "MOCKED_USER_2_FIRST_NAME",
    "lastName": "MOCKED_USER_2_LAST_NAME",
    "email": "MOCKED_USER_2_EMAIL",
    createdAt,
    updatedAt,
    "password": "<PASSWORD>"
  };

  const MOCKED_IMAGES = [
    "MOCKED_IMAGE_2_SRC_1",
    "MOCKED_IMAGE_2_SRC_2"
  ]

  test('1 - Get all favorites', async () => {
    const ExpectedResponse = [
      {
        "id": 'MOCKED_ID_1',
        "title": 'MOCKED_TITLE_1',
        "itemId": "MOCKED_ITEM_ID_1",
        "price": '100',
        "user": MOCKED_USER,
        "images": MOCKED_IMAGES,
        createdAt,
        updatedAt
      },
      {
        "id": 'MOCKED_ID_2',
        "title": 'MOCKED_TITLE_2',
        "itemId": "MOCKED_ITEM_ID_2",
        "price": '200',
        "user": MOCKED_USER_2,
        "images": MOCKED_IMAGES,
        createdAt,
        updatedAt
      }
    ];

    const mockFavoriteList = jest.spyOn(favoriteService['favoriteModel'], 'list');
    mockFavoriteList.mockResolvedValue(ExpectedResponse);

    const favoriteList = await favoriteService.getAll();

    expect(favoriteList).toEqual(ExpectedResponse);
    expect(mockFavoriteList).toHaveBeenCalled();
  });

  test('2 - Get all favorites by user', async () => {
    const ExpectedResponse = [
      {
        "id": 'MOCKED_ID_1',
        "title": 'MOCKED_TITLE_1',
        "itemId": "MOCKED_ITEM_ID_1",
        "price": '100',
        "user": MOCKED_USER,
        "images": MOCKED_IMAGES,
        createdAt,
        updatedAt
      }
    ];

    const mockFavoriteByUser = jest.spyOn(favoriteService['favoriteModel'], 'getByUser');
    mockFavoriteByUser.mockResolvedValue(ExpectedResponse);

    const favoriteByUser = await favoriteService.getAllByUser('MOCKED_ID_1');

    expect(favoriteByUser).toEqual(ExpectedResponse);
    expect(mockFavoriteByUser).toHaveBeenCalled();
  });

  test('3 - Create a new favorite', async () => {
    const newFavorite: ICreateFavoriteDTO = {
      "title": 'MOCKED_TITLE',
      "itemId": 'MOCKED_ITEM_ID',
      "price": "150",
      "images": [
        "MOCKED_IMAGE_SRC_1",
        "MOCKED_IMAGE_SRC_2"
      ],
      "user": MOCKED_USER
    };

    const ExpectedResponse = {
      "id": 'MOCKED_ID',
      "title": 'MOCKED_TITLE',
      "itemId": 'MOCKED_ITEM_ID',
      "price": "150",
      "images": MOCKED_IMAGES,
      "user": MOCKED_USER,
      createdAt,
      updatedAt
    };

    const mockCreate = jest.spyOn(favoriteService['favoriteModel'], 'create');
    mockCreate.mockResolvedValue(ExpectedResponse);

    const createdFavorite = await favoriteService.create(newFavorite);

    expect(createdFavorite).toEqual(ExpectedResponse);
    expect(mockCreate).toHaveBeenCalledWith(newFavorite);
  });

  test('4 - Handle errors when creating a favorite', async () => {
    const newFavorite: Partial<ICreateFavoriteDTO> = {
      "itemId": 'MOCKED_ITEM_ID',
      "price": "150",
      "user": MOCKED_USER,
    };

    await expect(favoriteService.create(newFavorite as ICreateFavoriteDTO)).rejects.toThrow(ErrorMessage.MissingRequiredParameters);
  });

  test('5 - Remove a favorite by Id', async () => {
    const favoriteId = 'MOCKED_ID';

    const mockFindById = jest.spyOn(favoriteService['favoriteModel'], 'findById');
    mockFindById.mockResolvedValue({
      "id": favoriteId,
      "title": 'MOCKED_TITLE',
      "itemId": 'MOCKED_ITEM_ID',
      "price": "150",
      "images": MOCKED_IMAGES,
      "user": MOCKED_USER,
      createdAt,
      updatedAt
    });

    const mockRemove = jest.spyOn(favoriteService['favoriteModel'], 'remove');
    mockRemove.mockResolvedValue(true);

    const removedFavorite = await favoriteService.remove(favoriteId);

    expect(removedFavorite).toEqual(true);
    expect(mockRemove).toHaveBeenCalledWith(favoriteId);
  });

  test('6 - Handle errors when removing a favorite', async () => {
    const favoriteId = 'NON_EXISTENT_ID';

    const mockFindById = jest.spyOn(favoriteService['favoriteModel'], 'findById');
    mockFindById.mockResolvedValue(null);

    await expect(favoriteService.remove(favoriteId)).rejects.toThrow(ErrorMessage.FavoriteNotFound);
  });
});
