import { getBookList } from "@/utils/getBookList";

export default async function Book() {
  const bookList = await getBookList();

  return <></>;
}
