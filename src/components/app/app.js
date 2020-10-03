import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {label: "Going to learn React", important: true, like: false, id: 1},
                {label: "Continue learning", important: false, like: false, id: 2},
                {label: "Almost finished", important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        };

        this.maxId = 4;

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImrotant = this.onToggleImrotant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id),
                  newArr = [...data.slice(0, index), ...data.slice(index + 1)];

                  return {
                      data: newArr
                  }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            like: false,
            id: this.maxId++
        };

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            
            return {
                data: newArr
            }
        });
    }

    onToggleImrotant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id),
                  newArr = [
                    ...data.slice(0, index), 
                    {...data[index], important: !data[index].important},
                    ...data.slice(index + 1)
                  ];

            return {
                data: newArr
            }
        });
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id),
                  newArr = [
                    ...data.slice(0, index), 
                    {...data[index], like: !data[index].like},
                    ...data.slice(index + 1)
                  ];

            return {
                data: newArr
            }
        });
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        } else {
            return items.filter(item => item.label.includes(term))
        }
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state,
              liked = data.filter(item => item.like === true).length,
              allPosts = data.length,
              visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter 
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImrotant={this.onToggleImrotant}
                    onToggleLiked={this.onToggleLiked}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </AppBlock>
        )
    }
} 