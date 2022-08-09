import { Container } from "../components/Container";
import InsertDemo from "../components/Insert";

export default function HowFastIsLyra() {
  return (
    <Container size="full" className="bg-violet-900">
      <div className="h-[200px] pt-10">
        <Container size="lg" className="flex flex-col justify-center h-full">
          <h1 className="text-4xl font-black"> How fast is Lyra? </h1>
          <p>Yes Lyra is fast. But how fast?</p>
        </Container>
      </div>

      <Container size="full" className="py-20 text-gray-900 bg-gray-200">
        <Container size="lg" className="min-h-[300px]">
          <InsertDemo />
        </Container>
      </Container>
    </Container>
  );
}
