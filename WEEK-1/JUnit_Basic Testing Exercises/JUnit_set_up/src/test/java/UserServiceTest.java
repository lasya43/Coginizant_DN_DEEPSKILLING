import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    // verify()
    @Test
    void testVerify() {

        UserRepository repository = mock(UserRepository.class);

        when(repository.findUser(1))
                .thenReturn(new User(1, "Raj"));

        UserService service = new UserService(repository);

        String name = service.getUserName(1);

        verify(repository).findUser(1);

        assertEquals("Raj", name);
    }

    // times()
    @Test
    void testTimes() {

        UserRepository repository = mock(UserRepository.class);

        when(repository.findUser(1))
                .thenReturn(new User(1, "Raj"));

        repository.findUser(1);
        repository.findUser(1);

        verify(repository, times(2)).findUser(1);
    }

    // never()
    @Test
    void testNever() {

        UserRepository repository = mock(UserRepository.class);

        when(repository.findUser(1))
                .thenReturn(new User(1, "Raj"));

        repository.findUser(1);

        verify(repository, never()).findUser(2);
    }

    // atLeastOnce()
    @Test
    void testAtLeastOnce() {

        UserRepository repository = mock(UserRepository.class);

        when(repository.findUser(1))
                .thenReturn(new User(1, "Raj"));

        repository.findUser(1);

        verify(repository, atLeastOnce()).findUser(1);
    }

    // atLeast()
    @Test
    void testAtLeast() {

        UserRepository repository = mock(UserRepository.class);

        when(repository.findUser(1))
                .thenReturn(new User(1, "Raj"));

        repository.findUser(1);
        repository.findUser(1);
        repository.findUser(1);

        verify(repository, atLeast(2)).findUser(1);
    }

    // atMost()
    @Test
    void testAtMost() {

        UserRepository repository = mock(UserRepository.class);

        when(repository.findUser(1))
                .thenReturn(new User(1, "Raj"));

        repository.findUser(1);
        repository.findUser(1);

        verify(repository, atMost(2)).findUser(1);
    }

    // anyInt()
    @Test
    void testAnyInt() {

        UserRepository repository = mock(UserRepository.class);

        when(repository.findUser(anyInt()))
                .thenReturn(new User(100, "Raj"));

        repository.findUser(10);

        verify(repository).findUser(anyInt());
    }

    // verifyNoInteractions()
    @Test
    void testVerifyNoInteractions() {

        UserRepository repository = mock(UserRepository.class);

        verifyNoInteractions(repository);
    }

    // verifyNoMoreInteractions()
    @Test
    void testVerifyNoMoreInteractions() {

        UserRepository repository = mock(UserRepository.class);

        when(repository.findUser(1))
                .thenReturn(new User(1, "Raj"));

        repository.findUser(1);

        verify(repository).findUser(1);

        verifyNoMoreInteractions(repository);
    }
}