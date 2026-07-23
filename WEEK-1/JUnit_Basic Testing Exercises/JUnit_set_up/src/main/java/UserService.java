public class UserService {

    private UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public String getUserName(int id) {

        User user = repository.findUser(id);

        return user.getName();
    }
}