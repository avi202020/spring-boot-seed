import {InMemoryDbService, ResponseInterceptor, ResponseOptions} from 'angular-in-memory-web-api';
import {User} from './objects/auditable/User';
import {ResponseList} from './objects/ResponseList';
import {Response} from './objects/Response';

export class InMemoryDatabase implements InMemoryDbService {
  public static APP_INFO: Response = InMemoryDatabase.GenerateAppInfo();
  public static Users: ResponseList = InMemoryDatabase.GenerateUsers();

  public static GenerateAppInfo(): Response {
    const response: Response = new Response();
    response.took = 1;
    response.data = {
      name: 'spring-boot-seed',
      version: '0.1'
    };

    return response;
  }

  public static GenerateUsers(): ResponseList {
    const testUser = 'Test User';
    const user: User = new User();
    user.id = 1;
    user.name = testUser;
    user.createdBy = testUser;
    user.createdDate = new Date().getTime();
    user.updatedBy = user.createdBy;
    user.updatedDate = user.updatedDate;

    const list: User[] = [user];

    const responseList: ResponseList = new ResponseList();
    responseList.size = list.length;
    responseList.data = list;
    responseList.took = 1;

    return responseList;
  }

  responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
    const url = reqInfo['url'];

    if (url === 'api/users') {
      resOptions.body = InMemoryDatabase.Users;
    } else if (url === 'api/app/info') {
      resOptions.body = InMemoryDatabase.APP_INFO;
    }

    return resOptions;
  }

  createDb() {

    return {
      app: [
        { id: 'info' }
      ],
      users: InMemoryDatabase.Users,
    };
  }


}