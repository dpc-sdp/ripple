/**
 * @description Map event content type detail terms to output
 */
export const expandDetail = (item: string) => {
  switch (item) {
    case 'Accessible venue':
      return 'This venue is wheelchair accessible.'
    case 'Child friendly':
      return 'This event is child-friendly.'
    case 'Free admission':
      return 'Admission is free.'
    case 'Online webinar':
      return 'This is an online event.'
    case 'Seniors':
      return 'This event is for seniors.'
    default:
      return item
  }
}
