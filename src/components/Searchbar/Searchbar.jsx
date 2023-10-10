import { useState } from "react";
import { toast } from "react-toastify";

import { SearchbarField, Header, Form, Button, Input, ButtonLabel} from "./Searchbar.styled"
// import { FetchMaterials } from "services/api"
// import { toast } from "react-toastify/dist/components";

export const Searchbar = ({ onSubmit }) => {

  const [searchQuery, setSearchQuery] = useState('')


    const handleChange = e => {
        setSearchQuery(e.target.value.toLowerCase());
    }

    const handleSubmit = e => {
        e.preventDefault();
       
        if(searchQuery.trim() === "") {
            toast.error("Enter something");
            return;
        }
        onSubmit(searchQuery);
        setSearchQuery('');
    }

    return (
        <SearchbarField>
            <Header>
                <Form onSubmit={handleSubmit}>

                <Input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <Button type="submit">
                    <ButtonLabel>Search</ButtonLabel>
                </Button>
                </Form>
            </Header>
        </SearchbarField>
    )

}