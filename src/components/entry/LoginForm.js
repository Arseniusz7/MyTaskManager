/**
 * project colors
 */

export const LoginForm = () =>
    <div>
        <h4>Log in</h4>
        <form action="/login" method="post">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Your Email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Your Password"/>
            </div>
            <input type="submit" value="Log in"/>
        </form>
    </div>