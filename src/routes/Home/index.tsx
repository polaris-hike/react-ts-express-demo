import React, {PropsWithChildren, useEffect, useRef} from 'react';
import HomeHeader from './components/HomeHeader';
import {RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {CombinedState, HomeState} from '@/types';
import mapDispatchToProps from '@/store/actions/home';
import './index.less';
import HomeSliders from '@/routes/Home/components/HomeSliders';
import LessonLists from '@/routes/Home/components/LessonLists';
import {loadMore, downRefresh} from "@/utils";

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>;

function Home(props: Props) {
    const homeContainer = useRef<HTMLDivElement>(null);
    useEffect(() => {
        loadMore(homeContainer.current, props.getLessons)
        downRefresh(homeContainer.current, props.refreshLessons)
    }, [])
    return (
        <div>
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
                refreshLessons={props.refreshLessons}
            />
            <div className="home-container" ref={homeContainer}>
                <HomeSliders sliders={props.sliders} getSliders={props.getSliders}/>
                <LessonLists lessons={props.lessons} getLessons={props.getLessons}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: CombinedState): HomeState => state.home;

export default connect(mapStateToProps, mapDispatchToProps)(Home);