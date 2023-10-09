import { Component } from "react";
import { toast } from "react-toastify";

import { SearchbarField, Header, Form, Button, Input, ButtonLabel} from "./Searchbar.styled"
// import { FetchMaterials } from "services/api"
// import { toast } from "react-toastify/dist/components";

export class Searchbar extends Component {

    state = {
        searchQuery: '',
    }


    handleChange = e => {
        this.setState({ searchQuery: e.target.value.toLowerCase() });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { searchQuery } = this.state;
        if(searchQuery.trim() === "") {
            toast.error("Enter something");
            return;
        }
        this.props.onSubmit(searchQuery);
        // this.setState({ searchQuery: '' })
    }

    render () {
        return (
            <SearchbarField>
                <Header>
                    <Form onSubmit={this.handleSubmit}>
    
                    <Input
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="searchQuery"
                        value={this.state.searchQuery}
                        onChange={this.handleChange}
                    />
                    <Button type="submit">
                        <ButtonLabel>Search</ButtonLabel>
                    </Button>
                    </Form>
                </Header>
            </SearchbarField>
        )
    }

}