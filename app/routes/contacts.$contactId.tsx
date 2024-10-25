// ファイル名の`.`は`/`を作成して、`$`はセグメントを動的にする。

import { Form } from "@remix-run/react";
import type { FunctionComponent } from "react";

import type { ContactRecord } from "../data";

export default function Contact() {
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placecats.com/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
      <div id="contact">
        <div>
          <img
              alt={`${contact.first} ${contact.last} avatar`}
              key={contact.avatar}
              src={contact.avatar}
          />
        </div>

        <div>
          <h1>
            {contact.first || contact.last ? (
                <>
                  {contact.first} {contact.last}
                </>
            ) : (
                <i>No Name</i>
            )}{" "}
            <Favorite contact={contact} />
          </h1>

          {contact.twitter ? (
              <p>
                <a
                    href={`https://twitter.com/${contact.twitter}`}
                >
                  {contact.twitter}
                </a>
              </p>
          ) : null}

          {contact.notes ? <p>{contact.notes}</p> : null}

          <div>
            <Form action="edit">
              <button type="submit">編集</button>
            </Form>

            <Form
                action="destroy"
                method="post"
                onSubmit={(event) => {
                  const response = confirm(
                      "このレコードを削除してもよろしいですか？"
                  );
                  if (!response) {
                    event.preventDefault();
                  }
                }}
            >
              <button type="submit">削除</button>
            </Form>
          </div>
        </div>
      </div>
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
  const favorite = contact.favorite;

  return (
      <Form method="post">
        <button
            aria-label={
              favorite
                  ? "お気に入りから削除"
                  : "お気に入りに追加"
            }
            name="favorite"
            value={favorite ? "false" : "true"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </Form>
  );
};
