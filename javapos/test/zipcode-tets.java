import Documents.src.*;

import static org.fest.assertions.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


public class ZipcodeTest {
    @Test
    public void hello_world_test() {
        //given
      translatezipcodeTobarcode zipcode=new translatezipcodeToBarcode();
        //when
        String actual = zipcod

        //then
        assertThat(actual).isEqualTo("Leave me alone.");
    }

    @Test
    public void should_be_mocked() {
        //given
        Dependency dependency = mock(Dependency.class);
        when(dependency.say()).thenReturn("Hello World");
        HelloWorld helloWorld = new HelloWorld(dependency);

        //when
        String actual = helloWorld.beenCalled();

        //then
        assertThat(actual).isEqualTo("Hello World");
    }
}
