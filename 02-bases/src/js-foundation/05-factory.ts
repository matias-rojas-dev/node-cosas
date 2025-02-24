interface Props {
  getUuid: () => string
  getAge: (birthday: string) => number
}
export const buildMakePerson = ({ getUuid, getAge }: Props) => {
  return ({ name, birthday }: { name: string; birthday: string }) => {
    return {
      id: getUuid(),
      name,
      birthday,
      age: getAge(birthday),
    }
  }
}
