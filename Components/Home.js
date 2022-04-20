export const home = () => {
    const homepage = `
    <section class="homePageContainer">
        <header>
        <nav> 
            <h1 class="headerTittle">Help Potatoes</h1>
            <img src="./img/logOutIcon.png" alt="" class="logOutIcon" id="logOutIcon">
        </nav>
        </header>
        <section class="createPostContainer">
            <section class="subCreatePostContainer">
                <section id="profileContainer" class="containerProfile">
                </section>
                <section class="postContainer" id="postContainer">     
                </section>
            </section>
            <section class="publicPost" id="postPublic">
            </section>
        </section>
    </section>`;
    return homepage;
};