import { MainTemplate } from '../../assets/templates/MainTemplate';
import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { Footer } from '../../components/Footer';
import { MainForm } from '../../components/MainForm';

export function Home() {
  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}
