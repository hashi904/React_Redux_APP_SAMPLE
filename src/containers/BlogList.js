import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchArticle} from '../actions/blogActions';
import {logout} from '../actions/authActions';
import { Link } from 'react-router-dom';
import DeleteModalWindow from './DeleteModalMenu'
import BlogUpdate from './BlogUpdate'

class BlogList extends Component {
    componentDidMount(){
        this.props.fetchArticle(this.props.token);
    }

    clickLogout(){
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        return(
            <div>
                <div>Hello {this.props.user.username}</div>
                <button onClick={this.clickLogout.bind(this)}>Logout</button>
                <Link to="/blog_new">新規作成</Link>
                <br />
                <ul>
                    {
                        this.props.articles.map((article) => {
                            return(
                                <div>
                                    <h1>{article.title}</h1>
                                    <p>{article.article}</p>
                                    <p>{article.created_at}</p>
                                    {this.props.user.id === article.user && <DeleteModalWindow article_id={article.id}/>}
                                    {this.props.user.id === article.user && 
                                        <Link to={{
                                            pathname: "/blog_update",
                                            state: {
                                                article_id: article.id,
                                                article_title: article.title,
                                                article_article: article.article
                                            }
                                        }}>
                                            UPDATE
                                        </Link>}
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

//storeから取り出し
const mapStateToProps = (state) => {
    return{
        user: state.auth.user,
        token: state.auth.token,
        articles: state.article.articles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchArticle: (token) => dispatch(fetchArticle(token)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)