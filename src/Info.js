export default function Info(props) {
    return(
        <div>
            <p>Quick Tips from <a href="http://www-cs-students.stanford.edu/~jl/Essays/minesweeper.html">John LeFlohic</a></p>
                <li>If you are forced to guess, make the guess which has the least risk.</li>
                <li>If you don't know all the moves, then trying to go faster actually makes you worse. So go slow.</li>
                <li>If you are forced to guess, make a guess that will actually help you if it turns out to be right.</li>
                <li>Don't just choose the first valid move you notice, choose the best move available.</li>
                <li>Don't mark a mine if it can't possibly help you figure out the clear squares.</li>
                <li>If you want to go your current fastest, distract yourself while you play by talking to someone or listening to tv.</li>
                <li>To improve beyond a certain plateau, you have to make 0 mistakes and know 100% of the moves.</li>
                <li>Avoid the walls until you have eaten out the center of the map.</li>
                <li>Trying to get a good opening should be avoided because it is short-termist.</li>
                <li>You should play slower until you notice the number of mistakes you make go down.</li>
                <li>Improve your mouse control by breathing out slowly while moving.</li>
                <li>Only move to the edge of the square you have to click, not its center.</li>
                <li>Avoid back-and-forth movements by organizing 3 or 4 clicks into a line.</li>
                <li>A move that doesn't open a square or mark a mine is a mistake.</li>
                <li>An unnecessary movement of the mouse is a mistake.</li>
                <li>Set the mouse movement rate to fastest</li>
                <li>Clicks register on mouse-up (i.e. when you release the button). So make your clicks snappy.</li>
                <li>An unnecessary click is a mistake, not just one that kills you.</li>
                <li>First make minimizing the number of clicks you need to complete a game your goal. Then make your goal speed.</li>
                <li>Instead of using 7 or 8 clicks to do something try to look for the 2 or 3 strategic clicks which will do the same thing.</li>
                <li>Imagine and already be planning for the states which could result from your current move.</li>
                <li>Always start from the same position.</li>
                <li>The best record I've been informed of is 28s for intermediate and 85s for expert by Robert Offutt. Please tell me if you know of better</li>
                <li>Accounting for times you die by chance, you should be able to finish the expert level about 50% of the time.</li>
                <li>The hypothetical minimum it takes to mark 99 mines is 40s. So see that as an asymptote.</li>
                <li>If you die, estimate your projected time using totalMines / minesMarked * yourTime (i.e. better feedback).</li>
                <li>If you become addicted, play a variety of other less-addictive games.</li>
                <li>Avoid loud, repetitive clicking when other people are present: it really annoys them -- they're just afraid to tell you.</li>
        </div>
    );
}