package com.techdevsolutions.service.user;

import com.techdevsolutions.beans.auditable.User;
import com.techdevsolutions.beans.ValidationResponse;
import com.techdevsolutions.dao.mysql.user.UserMySqlDao;
import com.techdevsolutions.dao.test.UserTestDao;
import com.techdevsolutions.service.BasicServiceInterface;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.logging.Logger;

@Service
public class UserService implements BasicServiceInterface<User> {
    private Logger logger = Logger.getLogger(UserService.class.getName());
    UserTestDao userDao;
//    UserMySqlDao userDao;

    public UserService(UserTestDao userDao) {
        this.userDao = userDao;
    }

//    public UserService(UserMySqlDao userDao) {
//        this.userDao = userDao;
//    }

    public List<User> getAll() throws Exception {
        logger.info("UserService - getAll");
        List<User> users = this.userDao.getAll();

        for (User user : users) {
            ValidationResponse vr = User.Validate(user);
            if (!vr.getValid()) { throw new Exception("Invalid item: " + vr.getMessage()); }
        }

        return users;
    }

    public User get(Integer id) throws Exception {
        logger.info("UserService - get - ID: " + id);

        return this.userDao.get(id);
    }

    public User create(User item) throws Exception {
        logger.info("UserService - create - name: " + item.getName());

        ValidationResponse vr = User.Validate(item, true);
        if (!vr.getValid()) { throw new Exception("Invalid item: " + vr.getMessage()); }

        User i = this.get(item.getId());
        if (i != null) { throw new Exception("UserService - create - Item already exists with ID: " + item.getId()); }

        return this.userDao.create(item);
    }

    public void delete(Integer id) throws Exception {
        logger.info("UserService - delete - ID: " + id);
        User i = this.get(id);
        if (i == null) { throw new NoSuchElementException("UserService - delete - Item was not found using ID: "+ id); }
        this.userDao.delete(id);
    }

    public void remove(Integer id) throws Exception {
        logger.info("UserService - remove - ID: " + id);
        User i = this.get(id);
        if (i == null) { throw new NoSuchElementException("UserService - remove - Item was not found using ID: "+ id); }
        this.userDao.remove(id);
    }

    public User update(User item) throws Exception {
        logger.info("UserService - update - ID: " + item.getId());

        ValidationResponse vr = User.Validate(item);
        if (!vr.getValid()) { throw new Exception("Invalid item: " + vr.getMessage()); }

        User i = this.get(item.getId());
        if (i == null) { throw new NoSuchElementException("UserService - update - Item was not found using ID: " + item.getId()); }

        i.setName(item.getName());
        i.setUpdatedBy(item.getUpdatedBy());
        i.setUpdatedDate(item.getUpdatedDate());
        return this.userDao.update(i);
    }
}