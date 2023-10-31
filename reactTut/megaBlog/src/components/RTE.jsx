/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue }) {
  return (
    <div className="w-full">
      {label && <label className="text-sm text-gray-500">{label}</label>}
      <Controller
        name={name || "name"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

RTE.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
};
