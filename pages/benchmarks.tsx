import { Container } from "../components/Container";
import InsertDemo from "../components/Insert";

export default function Benchmarks() {
  return (
    <Container size="full" className="bg-blue-900">
      <div className="h-[200px] pt-10">
        <Container size="lg" className="flex flex-col justify-center h-full">
          <h1 className="text-4xl font-black"> Benchmarks </h1>
        </Container>
      </div>

      <Container size="full" className="py-20 text-gray-900 bg-gray-200">
        <Container size="md">
          <InsertDemo />
        </Container>
      </Container>
    </Container>
  )
}