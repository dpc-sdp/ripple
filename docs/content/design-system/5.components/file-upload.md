---
title: File Upload
description: Let users upload files
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

Only ask users to upload files when it is critical for your service delivery.

Use file upload when you need a user to put a file from their device into a specific location on your site.

The file upload form label tells users the purpose of the file upload section. ‘Upload files’ is the default text that appears when you use this component.

Only ask for one file per input wherever possible. This avoids confusing users who might not know how to select multiple files or who use Apple devices. The Apple iOS does not allow multiple file selection in its Files app.

**Placeholder, need to add example**
![Nils Olav  - This is the alt text](/assets/img/temp/Nils_Olav_wide.jpg)

### How this component works

You must use a form label with file upload.

You can use file upload with:

- requirement label
- hint text
- metadata.

#### Hint text

Hint text is used to tell the user what, or how, to successfully upload a file.

For example, hint text can:

- describe the types of files to upload
- say the number of files to upload
- specify file requirements.

Only use hint text when users need this to understand how to successfully upload a file.

Don’t use hint text only to keep the layout consistent with other fields in the form. Don’t repeat the label.

#### Metadata

Use the metadata to help users understand what file types can be uploaded.

#### Upload field

The upload field can be either a drag-and-drop zone, for files to land in, or a button to click. Interacting with this field triggers the start of the file upload process.

Use short labels for the upload field. Labels should tell the user what will happen if they interact with the zone or button. ‘Drag and drop your files to upload’ and ‘Select a file’ is the default text that appears with the file upload component.

Only a button appears on devices smaller than <767px, by default.

When you drag a file over the drag-and-drop zone, the field changes its appearance to a file hover state. The button disappears and the label changes to ‘Drop your files here’.

#### File attachments

A file attachment appears below the upload field when it is uploaded successfully.

The file attachment shows the process of uploading. There are 3 separate states:

- **uploading:** shows a loading spinner plus a progress bar displaying the upload percentage
- **success:** the loading spinner changes to a check mark when the progress bar reaches 100%, confirming the file successfully uploaded
- **uploaded:** the check mark transitions to the uploaded state after a short delay, to show the upload process has finished.

Click the 'X' (delete) icon to remove a file.

### When and how to use
- Always use a form label for input fields
- Use hint text to help users understand what file is needed, for example ‘Upload your cover letter and resume' 
- Use metadata to help users understand specific file requirements, like type or size
- Allow more than one file type in an upload, since not all users have access to the same software

### When and how not to use
- Never use an input field without a form label
- Avoid asking for large-sized files when possible, since this can exclude users with limited bandwidth or data
- Don’t write ambiguous error messages or only say what's wrong - instead, tell the user how to fix that specific error

---

## Variants

### Default

**Placeholder, need to add example**
![Nils Olav  - This is the alt text](/assets/img/temp/Nils_Olav_wide.jpg)

### Error

All form inputs share error state styling.

Always have specific error messages for specific errors. Users need to understand why their input or selection was not valid.

When creating an error message for a file upload, use the wording below.

**Error: no file was selected**

- Error message: ‘Select a [the missing file]’
- Example: ‘Select a report’

**Error: file is the wrong file type**

- Error message: ‘The selected file must be a \[list of allowed file types\]’
- Example: ‘The selected file must be a CSV or ODS’ or ‘The selected file must be a JPG, BMP, PNG, TIF or PDF’

**Error: file size is too large**

- Error message: ‘The selected file must be smaller than \[largest file size\]’
- Example: ‘The selected file must be smaller than 2MB’

**Error: file is empty**

- Error message: 'The selected file is empty’

**Error: file contains a virus**

- Error message: ‘The selected file contains a virus’

**Error: file is password protected**

- Error message: ‘The selected file is password protected’

**Error: a problem occured and file didn’t upload**

- Error message: ‘The selected file could not be uploaded – try again’

**Error: limit on number of files selected was exceeded**

- Error message: ‘You can only select up to \[highest number\] files at the same time’
- Example: ‘You can only select up to 10 files at the same time’

**Error: file not in a required template, or template has been changed**

- Error message: ‘The selected file must use the template’

**Placeholder, need to add example**
![Nils Olav  - This is the alt text](/assets/img/temp/Nils_Olav_wide.jpg)

---

## Theming

File upload uses colour for:

- interactive states
- icons.

A file upload in an active state will adopt the same colour as the overall site’s focus state colour. This means a user’s experience of a file upload remains consistent while it transitions from a focus to an active state.

**Placeholder, need to add theming example**
![Nils Olav  - This is the alt text](/assets/img/temp/Nils_Olav_wide.jpg)

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().

---

## Rationale

The active and focus states both use the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This occurs across all form and input elements, for a consistent experience. 
